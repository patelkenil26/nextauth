"use client";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">👤 User Profile</h1>

        <hr className="mb-6" />

        {/* Profile Info */}
        <p className="text-lg text-gray-700 mb-4">Profile ID:</p>
        <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-lg shadow-md">
          {params.id}
        </span>

        {/* Extra Placeholder (Future Expansion) */}
        {/* <div className="mt-8 space-y-3">
          <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
            Edit Profile
          </button>
          <button className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition">
            Logout
          </button>
        </div> */}
      </div>
    </div>
  );
}
