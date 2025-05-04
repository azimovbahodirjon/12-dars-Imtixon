import React from "react";
import { motion } from "framer-motion";

function DeleteModal({ invoiceId, onDeleteButtonClick, setIsDeleteModalOpen }) {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsDeleteModalOpen(false);
        }
      }}
      className="fixed inset-0 px-2 py-4 flex justify-center items-center bg-[#000005be] z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
        className="bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md w-full px-8 py-8 rounded-xl"
      >
        <h3 className="font-bold text-red-500 text-xl">Confirm Deletion</h3>
        <p className="text-gray-500 font-semibold tracking-wide text-xs pt-6">
          Are you sure you want to delete invoice {invoiceId}? This action
          cannot be undone.
        </p>
        <div className="flex w-full mt-4 space-x-4">
          <button
            onClick={onDeleteButtonClick}
            className="w-full text-white bg-red-500 hover:bg-red-600 py-2 rounded-full transition-colors duration-200"
          >
            Delete
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="w-full text-[#635fc7] dark:bg-white bg-[#635fc71a] hover:bg-[#635fc733] py-2 rounded-full transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default DeleteModal;
