# 1. Use the official PHP image with 8.2 (or your preferred version)
FROM php:8.2-fpm

# 2. Install system dependencies for Laravel & PostgreSQL
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    libpq-dev \
    libonig-dev \
    libxml2-dev

# 3. Clear cache to keep the image small
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# 4. Install PHP extensions required by Laravel
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# 5. Get the latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 6. Set the working directory
WORKDIR /var/www

# 7. Copy your source code into the container
COPY . .

# 8. Install Laravel dependencies
# This runs 'composer install' without dev tools for speed and security
RUN composer install --no-dev --optimize-autoloader

# 9. Set permissions (Crucial! Laravel needs to write to these)
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# 10. The Startup Command
# This runs migrations and starts the Laravel server on port 10000
# NOTE: Render expects your app to be on port 10000 by default
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=10000

# 11. Expose the port
EXPOSE 10000