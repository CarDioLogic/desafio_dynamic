<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dev;
use Illuminate\Support\Str;

/**
 * Handles CRUD operations for Developers.
 */
class DevController extends Controller
{
    /**
     * List or search developers.
     *
     * If "terms" is provided, filters developers by:
     * - nickname
     * - name
     * - stack name
     *
     * If "terms" is missing, returns 400 Bad Request.
     *
     * @param Request $request
     * @query string $terms Search term (required)
     *
     * @return \Illuminate\Http\JsonResponse
     * Returns a list of developers.
     */
    public function index(Request $request)
    {
        $terms = $request->query('terms');

        //terms mandatory as specs require
        if (!$request->filled('terms')) {
            return response()->json(['message' => 'Specify search terms to find developers'], 400);
        }

        $query = Dev::query();

        $query->where(function ($q) use ($terms) {
            $q->where('name', 'like', "%{$terms}%")
              ->orWhere('nickname', 'like', "%{$terms}%")
              ->orWhereHas('stacks', function ($sq) use ($terms) {
                  $sq->where('name', 'like', "%{$terms}%");
              });
        });

        $results = $query->limit(20)->get();

        return response()
            ->json($results, 200)
            ->header('X-Total-Count', Dev::count());
    }

    /**
     * Get a developer by ID.
     *
     * @param string $id UUID of the developer
     *
     * @return \Illuminate\Http\JsonResponse
     * Returns developer data with stacks or 404 if not found.
     */
    public function show(string $id)
    {
        $dev = Dev::with('stacks')->find($id);

        if (!$dev) {
            return response()->json([
                'message' => 'Developer not found'
            ], 404);
        }

        return response()->json([
            'id' => $dev->id,
            'nickname' => $dev->nickname,
            'name' => $dev->name,
            'birth_date' => $dev->birth_date,
            'stack' => $dev->stacks->isEmpty()
                ? null
                : $dev->stacks->pluck('name')->values()
        ], 200);
    }

    /**
     * Create a new developer.
     *
     * Expected payload:
     * - nickname (string, unique, max 32)
     * - name (string, max 100)
     * - birth_date (Y-m-d format)
     * - stack (array of strings, optional)
     *
     * @param Request $request
     * @body string nickname
     * @body string name
     * @body string birth_date
     * @body array|null stack
     *
     * @return \Illuminate\Http\JsonResponse
     * Returns created developer with generated UUID.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nickname' => ['required', 'string', 'max:32', 'unique:devs,nickname'],
            'name' => ['required', 'string', 'max:100'],
            'birth_date' => ['required', 'date_format:Y-m-d'],
            'stack_names' => ['nullable', 'array'],
            'stack_names.*' => ['string', 'max:32'],
        ]);

        $dev = Dev::create([
            'nickname' => $validated['nickname'],
            'name' => $validated['name'],
            'birth_date' => $validated['birth_date'],
        ]);

        if (!empty($validated['stack_names'])) {
            foreach ($validated['stack_names'] as $tech) {
                $dev->stacks()->create([
                    'name' => $tech
                ]);
            }
        }

        return response()->json([
            'nickname' => $dev->nickname,
            'name' => $dev->name,
            'birth_date' => $dev->birth_date,
            'stack_names' => !empty($validated['stack_names'])
                ? $validated['stack_names']
                : null
        ], 201)
            ->header('Location', "/devs/{$dev->id}");
    }
}