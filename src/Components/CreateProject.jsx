import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    clientName: "",
    projectName: "",
    projectType: "",
    status: "Ongoing",
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing projects from localStorage
    const existingProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const newProject = { id: Date.now(), ...project };

    // Save new project
    localStorage.setItem(
      "projects",
      JSON.stringify([...existingProjects, newProject])
    );

    // Redirect to projects page
    navigate("/projects");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Create Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Client Name */}
        <div>
          <label className="block font-medium">Client Name</label>
          <input
            type="text"
            name="clientName"
            value={project.clientName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Project Name */}
        <div>
          <label className="block font-medium">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={project.projectName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Project Type */}
        <div>
          <label className="block font-medium">Project Type</label>
          <select
            name="projectType"
            value={project.projectType}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Type</option>
            <option value="Photography">Photography</option>
            <option value="Editing">Editing</option>
            <option value="Full">Full</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={project.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Save Project
        </button>
      </form>
    </div>
  );
}
