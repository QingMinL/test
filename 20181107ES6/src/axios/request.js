const service=axios.create({
    baseURL:process.env.Base_URL,
    timeout:5000
});

service.interceptors.request.use(config=>{
    console.log(config);
});