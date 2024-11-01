import { Stopwatch } from "@/components/stopwatch";
import { type FC } from "react";

const Home: FC = () => {
  return (
    <main>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <Stopwatch />
        </div>
      </div>
    </main>
  );
};

export default Home;