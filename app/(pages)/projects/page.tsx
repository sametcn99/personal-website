"use client";
// Projects component
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
} from "@nextui-org/react";
import Loading from "@/app/loading";
import StarIcon from "@mui/icons-material/Star";
import { GitHubRepo } from "@/types";
import { siteUrl } from "@/utils/utils";
import RateErrorComponent from "@/app/components/RateError";
import OpenOn from "@/app/components/OpenOn";

// Projects component
const Projects = () => {
  // State to store GitHub API data
  const [data, setData] = useState<GitHubRepo[] | null>(null);
  const [error, setError] = useState<string | null>(null); // New state for error message
  const [isLoading, setIsLoading] = useState(true);
  // Fetch data from GitHub API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/github?username=sametcn99&option=repos`,
          {
            cache: "no-store" && "no-cache",
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP hata! Durum kodu: ${response.status}`);
        }
        const fetchedData = await response.json();
        if (fetchedData.error) {
          // If there is an error in the data, set the error state
          setError(fetchedData);
        }

        // Sort the data by updated_at in descending order
        const sortedData = Array.isArray(fetchedData.data)
          ? fetchedData.data.sort(
              (a: any, b: any) =>
                new Date(b.pushed_at).getTime() -
                new Date(a.pushed_at).getTime(),
            )
          : null;
        setData(sortedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="">
          {error && (
            // Display error message in a div
            <RateErrorComponent errorJson={error} />
          )}
          {Array.isArray(data) &&
            data.map((project, index) => (
              <Card className="card-container" key={`${project.id}-${index}`}>
                <CardHeader className="card-header">
                  <div className="flex flex-row flex-wrap items-center">
                    <h1 className="text-small font-semibold leading-none text-default-600 hover:font-bold">
                      {project.name}
                    </h1>
                    {project.stargazers_count > 0 && (
                      <Tooltip
                        content="Total Stars"
                        delay={0}
                        closeDelay={0}
                        className="select-none bg-opacity-60 light:bg-black dark:bg-white"
                      >
                        <div className="flex scale-85 items-center gap-2 font-bold">
                          <StarIcon />
                          {project.stargazers_count}
                        </div>
                      </Tooltip>
                    )}
                  </div>
                  <OpenOn
                    demo={project.homepage ? project.homepage : null}
                    github={`${siteUrl}/${project.name}`}
                    githubide={project.html_url.replace(
                      "github.com",
                      "github.dev",
                    )}
                  ></OpenOn>
                </CardHeader>
                <CardBody className="card-body">{project.description}</CardBody>
                <CardFooter className="card-footer">
                  <div className="item flex flex-col flex-wrap gap-1 text-left text-xs">
                    <p>{project.license?.spdx_id}</p>
                    <p>
                      {project.language
                        ? `Language: ${project.language}`
                        : null}
                    </p>
                    <p>
                      Created at:{" "}
                      {new Date(project.created_at).toLocaleDateString()}
                    </p>
                    <p>
                      Last update:{" "}
                      {new Date(project.pushed_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="jus flex flex-row flex-wrap">
                    {project.topics.map((topic, index) => (
                      <p
                        key={index}
                        className="m-[0.063rem] mb-1 select-none rounded-2xl bg-slate-400 bg-opacity-5 p-1 text-xs font-thin hover:font-normal dark:bg-slate-900"
                      >
                        {topic}
                      </p>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
        </section>
      )}
    </>
  );
};

export default Projects;
