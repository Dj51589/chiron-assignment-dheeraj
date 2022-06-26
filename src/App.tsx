import style from "./App.module.scss";
import Header from "./components/Header/Header";
import PageView from "./components/PageView/PageView";
import SideBar from "./components/SideBar/SideBar";

function App() {
  return (
    <div className={`${style.App} flex-container flex-column h-100`}>
      <div className={style['main-header']}>
        <Header />
      </div>
      <div className={`${style['main-container']} flex-container flex-1`}>
        <div className={style['side-bar']}>
          <SideBar />
        </div>
        <div className="flex-conatiner flex-1">
          <PageView />
        </div>
      </div>

    </div>
  );
}

export default App;
