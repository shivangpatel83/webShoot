import { useNavigate } from 'react-router-dom';
import './capture.css'
import {toast} from "react-toastify";
import { addImage } from '../redux/actions';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

export const Capture = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const videoRef = useRef(null);
    const [isActive, setIsActive] = useState(true);
    const [image, setImage] = useState('');
    const [id, setId] = useState('');
    const [lati, setlati] = useState('');
    const [long, setLong] = useState('');
    
    const fetchDeviceId = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');
        if (videoDevices.length > 0) {
          const deviceId = videoDevices[0].deviceId;
          return deviceId
        }
      };

      const fetchCurrentLocation = () => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve({ latitude, longitude });
            },
            (error) => {
              reject(error);
            }
          );
        });
      };
      

      const saveUserInfo = async () => {

        if( id!=='' || lati !== '' || long !== '' || image !== ''){
        const userInfo = {
          deviceid : id,
          lat : lati,
          log : long,
          photo: image
        }
      
        try {
          const response = await fetch(' https://httpbin.org/post', {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: JSON.stringify(userInfo),
          });
          if (response.ok) {
            toast.success('User information saved successfully.')
            dispatch(addImage(userInfo))
            setImage('')
            setId('')
            setLong('')
            setlati('')
          } else {
            toast.error('Failed to save user information.');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }else{
        toast.error('Please Capture a Image first!!!');

      }
      };

  const handleStartCapture = async () => {
    setIsActive(false)
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const handleCapturePhoto = async () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
     setImage(canvas.toDataURL('image/png'));
    const deviceId =  await fetchDeviceId()
    setId(deviceId)
    const deviceLocation =  await fetchCurrentLocation()
    setlati(deviceLocation.latitude)
    setLong(deviceLocation.longitude)
  };

  return (
    <div className='container'>
        <div className='capture'>
            <video ref={videoRef} autoPlay ></video>
            <div className='captureBtns'>
            <button className='btn startBtn' onClick={handleStartCapture}>Start Capture</button>
            <button className='btn' disabled={isActive} onClick={handleCapturePhoto}>Capture Photo</button>
            </div>
        </div>
        <div className="showCaptured">
        <div className="photo">
            {image?
            <img className='clickedImage' src={image}  alt="Captured"/>
        :
        ''
        }
            
        </div>
        <div className="deviceId fields">
            <label htmlFor="id">Device ID: </label>
            <input type="text" value={id} name="id" id="id" />
        </div>
        <div className="latitude fields">
            <label htmlFor="lat">Lat: </label>
            <input type="text" value={lati} name="lat" id="lat" />
        </div>
        <div className="longitude fields">
            <label htmlFor="log">Log: </label>
            <input type="text" value={long} name="log" id="ilogd" />
        </div>
        <div className='saveBtn'>
            <button className='clickBtn' disabled={isActive} onClick={saveUserInfo}>Save</button>
            <button className='clickBtn'onClick={()=>navigate('/images')}>View</button>
        </div>
        </div>
    </div>
  );
};

