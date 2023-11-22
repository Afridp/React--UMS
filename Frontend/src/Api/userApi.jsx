import axios from 'axios'
const token = localStorage.getItem("token")


const userApi = axios.create({
    baseURL : `http://localhost:3000`,
    headers:{
      Authorization:token
    }
})
export async function userSignup(signupData){
    try {
        const data = await userApi.post('/signup',signupData)
        return data
    } catch (error) {
        console.log(error.message);
    }
}
export const userLogin = async (loginData) => {
    try {
      const data = await userApi.post("/login", loginData);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

export const userImage = async (id,images) =>{
  try {
    const data = new FormData()
    data.append('image',images)
    data.append('userId',id)
    const config={
      header:{
          'content-type':'multipart/form-data',
          userId : id
      },WithCreadentials:true
  }
    const datas = await userApi.post('/updateImage',data,config)
    return datas
  } catch (error) {
    console.log(error.message);
  }
}