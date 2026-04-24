export default function ModalWrapper({children, setCloseModal}) {

  const closeModal = () => {
    setCloseModal(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    onClick={() => closeModal()}>
      <div className="relative bg-gray-50 rounded-lg p-6 flex flex-col min-w-[500px] z-100"
      onClick={(e) => e.stopPropagation()}>
            {children}
        <div onClick={() => closeModal()}
          className="cursor-pointer absolute w-[30px] h-[30px] flex items-center justify-center bg-gray-600 rounded-full text-white top-[-10px] right-0">
            <img src="/icons/close.svg"/>
        </div>
        </div>
    </div>
  )
}
