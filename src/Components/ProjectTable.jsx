import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectTable() {
  const [projects, setProjects] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    // Sample Data
    const sampleProjects = [
      {
        id: 1,
        clientName: "ABC Corp",
        projectName: "Website Redesign",
        projectType: "Web Development",
        status: "Ongoing",
      },
      {
        id: 2,
        clientName: "XYZ Ltd",
        projectName: "Mobile App",
        projectType: "App Development",
        status: "Completed",
      },
      {
        id: 3,
        clientName: "LMN Pvt",
        projectName: "E-commerce Store",
        projectType: "E-commerce",
        status: "On Hold",
      },
      {
        id: 4,
        clientName: "PQR Inc",
        projectName: "Logo Design",
        projectType: "Graphic Design",
        status: "Ongoing",
      },
    ];

    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    if (!storedProjects || storedProjects.length === 0) {
      localStorage.setItem("projects", JSON.stringify(sampleProjects));
      setProjects(sampleProjects);
    } else {
      setProjects(storedProjects);
    }
  }, []);

  const handleDelete = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const filteredProjects = projects.filter(
    (project) => filteredStatus === "All" || project.status === filteredStatus
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {/* Filter and Add New Button */}
      <div className="mb-4 flex justify-between items-center">
        {/* Status Filter Dropdown */}
        <select
          className="p-2 border rounded-md"
          value={filteredStatus}
          onChange={(e) => setFilteredStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>

        {/* Add New Project Button */}
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => navigate("/create-project")}
        >
          Add New Project
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Client Name</th>
              <th className="border p-2">Project Name</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <tr key={project.id} className="text-center">
                  <td className="border p-2">{project.clientName}</td>
                  <td className="border p-2">{project.projectName}</td>
                  <td className="border p-2">{project.projectType}</td>
                  <td className="border p-2">{project.status}</td>
                  <td className="border p-2 flex justify-center gap-2">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      onClick={() => navigate(`/edit-project/${project.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
