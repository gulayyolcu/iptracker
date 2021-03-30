import header from './components/images/pattern-bg.png';
import IpLocation from './components/IpLocation';
import './index.css';

const App = () => {

return (
    <div className="min-h-screen w-full flex flex-col relative">
        <div className="">
            <img style={{height:"250px",width:"1500px"}} className="object-cover" src={header} alt="header"/>
        </div>
        <IpLocation/>
        <div className="attribution z-50 absolute bottom-5 lg:left-1/3 ml-28 text-md">
          Challenge by <a className="text-indigo-700 font-bold" href="#!" target="_blank">Frontend Mentor</a>. 
          Coded by <a className="text-indigo-700 font-bold" href="#!">Gülay Yolcu</a>.
        </div>
   
    </div>
  )
}

export default App

