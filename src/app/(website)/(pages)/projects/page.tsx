import { getProjects } from '@/src/sanity/lib/fetch';
import Link from 'next/link';
import Image from 'next/image';

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Projects</h1>

      {projects.length === 0 ? (
        <p className="text-gray-600">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              {project.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <h2 className="mb-2 text-xl font-semibold">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="transition-colors hover:text-blue-600"
                  >
                    {project.title}
                  </Link>
                </h2>

                <p className="mb-4 line-clamp-3 text-gray-600">
                  {project.shortDescription}
                </p>

                <div className="flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                  >
                    View Details
                  </Link>

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 transition-colors hover:text-blue-700"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
