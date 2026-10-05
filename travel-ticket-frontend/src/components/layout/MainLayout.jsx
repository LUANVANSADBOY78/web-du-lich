import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatbotWidget from '../common/ChatbotWidget';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
      
      {/* Global AI Chatbot */}
      <ChatbotWidget />
    </div>
  );
};

export default MainLayout;
