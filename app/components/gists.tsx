"use client";
// gists component
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Loading from "../loading";
import ErrorComponent from "./RateError";
import SourceCode from "./ui/CardButtons";
import { GitHubRepo } from "@/types";

// Gistss component
const Gists = () => {
  // State to store GitHub API data
  const [data, setData] = useState<GitHubRepo[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // New state for error message

  // Fetch data from GitHub API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/gists?username=sametcn99");
        if (!response.ok) {
          throw new Error(`HTTP hata! Durum kodu: ${response.status}`);
        }
        const fetchedData = await response.json();
        if (fetchedData.error) {
          // If there is an error in the data, set the error state
          setError(fetchedData.error);
        }
        // Sort the gists by updated_at in descending order
        const sortedData = Array.isArray(fetchedData)
          ? fetchedData.sort(
              (a, b) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
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
        <>
          {error && (
            // Display error message in a div
            <ErrorComponent text={error} />
          )}
          {Array.isArray(data) &&
            data.map((gist, index) => (
              <Card
                className="z-10 my-3 text-white bg-opacity-50 select-none hover:scale-105 max-w-[35rem]"
                key={`${gist.id}-${index}`}
              >
                <CardHeader className="justify-between">
                  <div className="flex flex-col items-start">
                    {Object.keys(gist.files).map((filename, index) => (
                      <div key={index}>{filename}</div>
                    ))}
                  </div>
                  <SourceCode
                    href={gist.html_url}
                    title="Source Code"
                    logo={<GitHubIcon className="text-sm fill-white" />}
                  />
                </CardHeader>
                <CardBody className="py-0 px-3 text-small text-default-600">
                  {gist.description}
                </CardBody>
                <CardFooter className="flex flex-col gap-3 items-start">
                  <div className="flex flex-col flex-wrap gap-1 text-xs text-left item">
                    <p>
                      Created at:{" "}
                      {new Date(gist.created_at).toLocaleDateString()}
                    </p>
                    <p>
                      Last update:{" "}
                      {new Date(gist.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </>
      )}
    </>
  );
};

export default Gists;
