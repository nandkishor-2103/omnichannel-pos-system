export default function App() {
  const teammates = [
    {
      name: "Nandkishor",
      role: "Backend Developer",
    },
    {
      name: "Raj Kumar",
      role: "Frontend Developer",
    },
    {
      name: "Deepika D",
      role: "DevOps & Integration",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Omnichannel POS System
          </h1>

          <p className="text-lg text-gray-600">
            Cloud-native Retail POS and Inventory Management Platform
          </p>
        </div>

        {/* Setup Status */}
        <div className="border-y border-gray-200 py-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Frontend Setup Completed Successfully 🚀
          </h2>

          <p className="text-gray-600 leading-7 max-w-2xl mx-auto">
            React, TypeScript, Tailwind CSS, Docker setup, and project architecture have
            been configured successfully. The project is now ready for development.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Tech Stack
          </h3>

          <div className="flex flex-wrap justify-center gap-3">
            {["React", "TypeScript", "Tailwind CSS", "Vite"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Team Members
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {teammates.map((member) => (
              <div
                key={member.name}
                className="border border-gray-200 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition"
              >
                <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>

                <p className="text-gray-600 mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
