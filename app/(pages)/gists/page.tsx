"use client";
// gists component
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { GitHubRepo } from "@/types";
import Loading from "@/app/loading";
import RateErrorComponent from "@/app/components/RateError";
import CardButton from "@/app/components/CardButton";

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
        const response = await fetch(
          "/api/github?username=sametcn99&option=gists",
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
          setError(fetchedData.error);
        }
        // Sort the gists by updated_at in descending order
        const sortedData = Array.isArray(fetchedData)
          ? fetchedData.sort(
              (a, b) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime(),
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
        <section>
          {error && (
            // Display error message in a div
            <RateErrorComponent text={error} />
          )}
          {Array.isArray(data) &&
            data.map((gist, index) => (
              <Card className="card-container" key={`${gist.id}-${index}`}>
                <CardHeader className="card-header">
                  <div className="flex flex-col items-start">
                    {Object.keys(gist.files).map((filename, index) => (
                      <div key={index}>{filename}</div>
                    ))}
                  </div>
                  <CardButton
                    href={gist.html_url}
                    title="Source Code"
                    logo={<GitHubIcon className="fill-white text-sm" />}
                  />
                </CardHeader>
                <CardBody className="card-body">{gist.description}</CardBody>
                <CardFooter className="card-footer">
                  <p>
                    Created at: {new Date(gist.created_at).toLocaleDateString()}
                  </p>
                  <p>
                    Last update:{" "}
                    {new Date(gist.updated_at).toLocaleDateString()}
                  </p>
                </CardFooter>
              </Card>
            ))}
        </section>
      )}
    </>
  );
};

export default Gists;
