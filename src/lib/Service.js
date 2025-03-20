import axiosInstance from "./Interceptor/Interceptor";


export const SubmitContactWithUsForm = async (formData) => {
    try {
      const response = await axiosInstance.post("/v1/chat-with-us", formData);
      return response; 
    } catch (error) {
      console.log('Error SubmitContactWithUs form: ' + error);  
      throw error; 
    }
};

  
export const SubmitAddFriendForm = async (formData) => {
  try {
    const response = await axiosInstance.post("/v1/profile", formData);
    return response; 
  } catch (error) {
    console.log('Error SubmitAddFriendForm form: ' + error);  
    throw error; 
  }
};

export const NewsLetterService = async (formData) => {
  try {
    const response = await axiosInstance.post("/v1/api/newsLetter", formData);
    return response;  
  } catch (error) {
    console.log('Error NewsLetter form: ' + error);  
    throw error; 
  }
};


export const GetCurrencies = async () => {
  try {
    const response = await axiosInstance.get(`/v1/locale/currency`);
    
    const currencies = await response.data.reduce((a, c) => {
      a[c.id] = c
      return a
    }, {})
    return currencies 
  } catch (error) {
    console.log('Error GetAllCategories: ' + error);  
    throw error; 
  }
};

export const GetLocalLanguage = async () => {
  try {
    const response = await axiosInstance.get(`/v1/locale/language`);
    return response;  
  } catch (error) {
    console.log('Error GetLocalLanguage: ' + error);  
    throw error; 
  }
};

export const GetCalenderData = async (month,year) => {
  try {
    const response = await axiosInstance.get(`/v1/class/schedule/public?limit=7&page=1`);
    return response;  
  } catch (error) {
    console.log('Error GetCalenderData: ' + error);  
    throw error; 
  }
};


export const  GetClassScheduleById = async (id) => {
  try {
    const response = await axiosInstance.get(`/v1/class/schedule/${id}`);
    return response;  
  } catch (error) {
    console.log('Error GetClassScheduleById: ' + error);  
    throw error; 
  }
};

export const  CreateNormalInquiry = async (inquiry) => {
  try {
    const response = await axiosInstance.post(`/v1/inquiry/normal`,inquiry);
    return response;  
  } catch (error) {
    console.log('Error CreateNormalInquiry: ' + error);  
    throw error; 
  }
};

 

export const  LoginFormService = async (formData) => {
  try {
    const response = await axiosInstance.post("/v1/auth/login", formData);
    return response;  
  } catch (error) {
    console.log('Error submitting the login form:' + error);  
    throw error; 
  }
};


export const  RegisterFormService = async (id,formData) => {
  try {
    const response = await axiosInstance.patch(`/v1/inquiry/${id}`, formData);
    return response;  
  } catch (error) {
    console.log('Error submitting the register api:' + error);  
    throw error; 
  }
};

export const  GetInquiryService = async (id) => {
  try {
    const response = await axiosInstance.get(`/v1/inquiry/${id}`);
    return response;  
  } catch (error) {
    console.log('Error fetching  the get Inquiry api:' + error);  
    throw error; 
  }
};

export const  CreateActivityService = async (log) => {
  try {
    const response = await axiosInstance.post(`/v1/activity`, log);
    return response;  
  } catch (error) {
    console.log('Error submitting the create activity api:' + error);  
    throw error; 
  }
};

export const  GetProfileService = async (id) => {
  try {
    const response = await axiosInstance.get(`/v1/profile/user?user=${id}`);
    return response;  
  } catch (error) {
    console.log('Error fetching  the get profile api:' + error);  
    throw error; 
  }
};