import Scheduler from "./components/scheduler";
import "./App.css";

function App() {
  return (
    <div class="container py-3">
      <header>
        <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 class="display-4 fw-normal">Board Game Scheduler</h1>
          <p class="fs-5 text-muted">
            Do you play board games with friends online? Are you tired of
            waiting for your friends to finish work and play their turns? Now
            with <i>Board Game Scheduler</i> you can optimize the turn order for
            the least amount of waiting! Simply use or{" "}
            <i className="fa fa-plus-square" aria-hidden="true"></i> or{" "}
            <i className="fa fa-times-circle" aria-hidden="true"></i> to add or
            remove players. Pick the time zone and select what hours of the day
            each player is available to play their turns. Below you will see
            which turn orders allow you to play the most!
          </p>
        </div>
      </header>
      <main className="continer">
        <Scheduler />
      </main>
    </div>
  );
}

export default App;
