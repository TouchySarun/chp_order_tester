import Link from "next/link";

function SessionExpire() {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <h3
                className="text-xl font-semibold leading-6 text-gray-900"
                id="modal-title"
              >
                session หมดอายุ
              </h3>
              <p>กรุณา login</p>
              <Link
                href="/login"
                className="text-xl bg-green-400 rounded-xl shadow-xl"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionExpire;
