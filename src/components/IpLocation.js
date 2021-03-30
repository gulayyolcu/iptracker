import {useEffect, useState} from 'react';
import axios from 'axios';
import '../index.css';
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

const IpLocation = () => {

    const [isLoading,setIsLoading]=useState(false);

    const [myIp,setMyIp]=useState("");

    const [locData,setLocData]=useState();

    const apiKey='at_F7vDyuGcqTVLUhdhgtJf9QD39rFKf';

    const getIp=async ()=>{ 
        const myipdata=await axios.get("https://api.ipify.org?format=json")
        setMyIp(myipdata.ip);    
    }

    var {ip,isp,location}={...locData};
    var {region,city,lat,lng,timezone,geonameId}={...location};

    var latt=null;
    var lngg=null;

    const validateIP=(ipAddress)=>{
        const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (ipAddress.match(ipformat)) {
     
          return true;
        }
        return false;
    }

    const getLocationData=async ()=>{
        ip=myIp;
        const iplocdata=await axios.get(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}`)
        setLocData(iplocdata.data);
        setIsLoading(()=>{
            return(
                (latt!==lat && lngg!==lng)?true:false
            )
        });
        lat=latt;
        lng=lngg;  
    }

    function ChangeMapView({ coords }) {
        const map = useMap();
        map.setView(coords, map.getZoom());
        return null;
    }

    useEffect(()=>{    
        getIp();
        getLocationData(); 
    })

    const coord=[lat,lng];

    const handleClick=(e)=>{
        setMyIp(ip);
    }

    const handleChange=(e)=>{
        setMyIp(e.target.value);
        
    }

    const handleSubmit=(e)=>{    
        var ipinput=document.getElementById("ipInput").value;
        if(ipinput){
            ip=ipinput;
            if(!validateIP(ip)){
                ipinput="Invalid Ip!";
           
            }
        }   
    }

    return (
        <div className="relative ">
            <div className="-mt-24">
                <div className="flex flex-col items-center bg-white lg:flex lg:flex-row lg:justify-center lg:items-start px-16 py-4 rounded rounded-lg font-bold w-3/4 mx-auto shadow-md relative z-50">
                    <div className="flex flex-col items-center lg:mx-auto absolute -mt-32">
                        <h1 className="text-white font-bold mb-4">Ip Address Tracker</h1>
                        <form className="flex">
                            <div className="flex flex-col items-start space-y-4" onSubmit={handleSubmit}>
                                <input id="ipInput" onChange={handleChange} className="p-4 rounded rounded-lg w-96 text-sm outline-none " type="text" placeholder="Search for any IP address or domain"/>
                               
                            </div>
                        
                            <div onClick={handleClick} className="relative bg-black w-12 -ml-2 rounded-l-0 rounded-r-lg hover:bg-gray-800 pl-1">
                                <svg className="mt-4 ml-4" xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6"/></svg>
                            </div>
                            
                        </form>
                    </div>

                    <div className="flex flex-col pt-2 items-center bg-white lg:flex lg:flex-row lg:justify-center lg:items-start lg:space-x-16 z-50">
                        <div className="mb-8 lg:mb-8">
                            <h5 className="text-gray-400 text-xs text-center lg:text-left">IP ADDRESS</h5>
                            <p className="text-xl mt-4">{ip}</p>
                        </div>
                        <div className="mb-8 lg:mb-8">
                            <h5  className="text-gray-400 text-xs text-center lg:text-left">LOCATION</h5>
                            <div className="inline-block pt-4 text-center lg:text-left">
                                <p className="text-xl">{city}, </p> 
                                <p className="text-xl">{region}, </p> 
                                <p className="text-xl">{geonameId}</p>
                            </div>
                            
                        </div>
                        <div className="mb-8 lg:mb-8">
                            <h5  className="text-gray-400  text-xs text-center lg:text-left">TIMEZONE</h5>
                            <p className="text-xl mt-4">UTC {timezone}</p>
                        </div>
                        <div div className="mb-8 ">
                            <h5  className="text-gray-400 break-word text-xs text-center lg:text-left">ISP</h5>
                            <p className="text-xl text-center mt-4 break-words lg:text-left">{isp}</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        <div  className="leaflet-container w-full -mt-96 absolute z-0 lg:-mt-24">
            {
                (isLoading)?(
                    <MapContainer center={coord} zoom={12}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                        <Marker position={coord}/>
                        <ChangeMapView coords={coord}/>
                    </MapContainer>
                ):(<div className="flex justify-center items-center"><h1 className="text-2xl text-indigo-700">Loading proccess is failed!</h1></div>)
            }
            
        </div>
      </div>  
        
    )
}

export default IpLocation;
