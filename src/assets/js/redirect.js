import { useNavigate } from 'react-router-dom';
import api, { config } from './api';
export const redirect = async (vidId, paidVideo) => {
    const navigate = useNavigate();
    api.get(`/videosDetails/${vidId}/`, config)
    .then(res => {
      const data = res.data
      sessionStorage.setItem("toPlay", JSON.stringify(data))
      if(paidVideo.includes(data.title)){
        navigate(`/play/${vidId}/`)
      } else {
        navigate(`/store/${vidId}/`)
      }
    })
  }