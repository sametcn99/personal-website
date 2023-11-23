// gists component
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Tooltip,
} from "@nextui-org/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import StarIcon from "@mui/icons-material/Star";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type GitHubRepo = {
  id: number;
  name: string;
  stars: number;
  html_url: string;
  home_page: string;
  description: string;
  created_at: string;
  updated_at: string;
  topics: string[];
  license_name: string;
  license_url: string;
  language: string;
  license_key: string;
  license_spdx_id: string;
  files: string[];
};
// Gistss component
const Gists = () => {
  // State to store GitHub API data
  const [data, setData] = useState<GitHubRepo[] | null>(null);

  // Fetch data from GitHub API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/gists");
        if (!response.ok) {
          throw new Error(`HTTP hata! Durum kodu: ${response.status}`);
        }
        const fetchedData = await response.json();
        console.log(fetchedData);
        // sort data by stars
        //const sortedData = fetchedData.sort((a, b) => b.stars - a.stars);

        setData(fetchedData);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
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
              <div>
                <a href={gist.html_url} target="_blank">
                  <Button
                    className={
                      "text-foreground border border-opacity-50 border-white hover:bg-opacity-50 hover:bg-zinc-700 transition-all duration-1000 fill-white "
                    }
                    radius="full"
                    size="sm"
                    variant={"bordered"}
                  >
                    Source Code
                    <GitHubIcon className="text-sm fill-white" />
                  </Button>
                </a>
              </div>
            </CardHeader>
            <CardBody className="py-0 px-3 text-small text-default-600">
              {gist.description}
            </CardBody>
            <CardFooter className="flex flex-col gap-3 items-start">
              <div className="flex flex-col flex-wrap gap-1 text-xs text-left item">
                <p>
                  Created at: {new Date(gist.created_at).toLocaleDateString()}
                </p>
                <p>
                  Last update: {new Date(gist.updated_at).toLocaleDateString()}
                </p>
              </div>
            </CardFooter>
          </Card>
        ))}
    </>
  );
};

export default Gists;
