import MainPage from "./pages/MainPage";
import Spline from '@splinetool/react-spline/next';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div>
      <MainPage />
      <ToastContainer />
    </div>
  );
}
