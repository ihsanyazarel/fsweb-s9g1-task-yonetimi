import { useState, useEffect } from "react";
import "./app.css";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);
  const gorevTamamlandı = () =>
    toast.success("Görev tamamlanmıştır.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  const kisiEklendi = () =>
    toast.info("Kişi eklenmiştir.", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      progress: undefined,
      theme: "dark",
    });
    const gorevEklendi = () =>
    toast.info("Görev eklenmiştir.", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      progress: undefined,
      theme: "dark",
    });

  // useEffect(() => {
  //   console.log(tasks);
  // }, [tasks]);

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks]);
    gorevEklendi();
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi]);
    kisiEklendi();
  }

  function handleComplete(id) {
    const completedTask = tasks.find((task) => task.id == id);
    completedTask.status = "yapıldı";
    setTasks([...tasks], completedTask);
    gorevTamamlandı();
    console.log(tasks);
  }

  return (
    <div className="app">
      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Task</h2>
          {/* <TaskForm kisiler={team} submitFn={handleTaskSubmit} /> */}
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>
        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapıldı")
              .map((t) => (
                <Task key={t.id} taskObj={t} />
              ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
