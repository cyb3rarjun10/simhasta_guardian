interface ChatResponse {
  keywords: string[];
  response: {
    en: string;
    hi: string;
  };
}

export const chatbotResponses: ChatResponse[] = [
  {
    keywords: ['hello', 'hi', 'namaste', 'hey'],
    response: {
      en: 'Hello! Welcome to Simhastha Guardian. How can I help you today?',
      hi: 'नमस्ते! सिंहस्थ गार्जियन में आपका स्वागत है। आज मैं आपकी कैसे सहायता कर सकता हूँ?'
    }
  },
  {
    keywords: ['timing', 'time', 'schedule', 'when', 'samay'],
    response: {
      en: 'Bathing timings: 4:00 AM - 6:00 PM daily. Best times are early morning (4-7 AM) and evening (4-6 PM) to avoid crowds.',
      hi: 'स्नान का समय: प्रतिदिन सुबह 4:00 बजे से शाम 6:00 बजे तक। भीड़ से बचने के लिए सुबह जल्दी (4-7 बजे) और शाम (4-6 बजे) का समय सबसे अच्छा है।'
    }
  },
  {
    keywords: ['direction', 'route', 'how to reach', 'path', 'rasta'],
    response: {
      en: 'Main routes: 1) Via NH-3 from Indore (75km), 2) Railway: Ujjain Junction, 3) Airport: Indore (75km). Follow traffic guidelines and use designated parking areas.',
      hi: 'मुख्य मार्ग: 1) इंदौर से NH-3 के माध्यम से (75 किमी), 2) रेलवे: उज्जैन जंक्शन, 3) हवाई अड्डा: इंदौर (75 किमी)। यातायात नियमों का पालन करें और निर्धारित पार्किंग क्षेत्रों का उपयोग करें।'
    }
  },
  {
    keywords: ['health', 'medical', 'doctor', 'first aid', 'swasthya'],
    response: {
      en: 'Medical facilities: 24/7 medical camps at Main Ghat, Food Court, and Parking areas. Emergency number: 108. Carry basic medicines and stay hydrated.',
      hi: 'चिकित्सा सुविधाएं: मुख्य घाट, फूड कोर्ट और पार्किंग क्षेत्रों में 24/7 चिकित्सा शिविर। आपातकालीन नंबर: 108। बुनियादी दवाएं साथ रखें और पानी पीते रहें।'
    }
  },
  {
    keywords: ['crowd', 'rush', 'busy', 'bheed'],
    response: {
      en: 'Current crowd status: Check the live map on home screen. Avoid Main Ghat during 6-10 AM and 5-7 PM. Use alternative ghats during peak hours.',
      hi: 'वर्तमान भीड़ की स्थिति: होम स्क्रीन पर लाइव मैप देखें। सुबह 6-10 बजे और शाम 5-7 बजे मुख्य घाट से बचें। व्यस्त समय में वैकल्पिक घाटों का उपयोग करें।'
    }
  },
  {
    keywords: ['food', 'prasad', 'bhojan', 'khana'],
    response: {
      en: 'Food courts available at designated areas. Free prasad distribution at temple premises. Carry water bottles and avoid outside food for health safety.',
      hi: 'निर्धारित क्षेत्रों में फूड कोर्ट उपलब्ध हैं। मंदिर परिसर में मुफ्त प्रसाद वितरण। पानी की बोतलें साथ रखें और स्वास्थ्य सुरक्षा के लिए बाहर का खाना न खाएं।'
    }
  },
  {
    keywords: ['lost', 'missing', 'help', 'khoya', 'madad'],
    response: {
      en: 'Lost & Found centers at Main Gate, Food Court, and Admin Office. Report missing persons immediately. Use our incident reporting feature or call helpline: 102.',
      hi: 'मुख्य गेट, फूड कोर्ट और एडमिन ऑफिस में लापता और मिली वस्तुओं के केंद्र। लापता व्यक्तियों की तुरंत रिपोर्ट करें। हमारे घटना रिपोर्टिंग फीचर का उपयोग करें या हेल्पलाइन कॉल करें: 102।'
    }
  },
  {
    keywords: ['donation', 'daan', 'seva'],
    response: {
      en: 'Digital donations accepted through our app. Support categories: General Fund, Food Distribution, Medical Aid, Sanitation. All donations are tax-exempt under 80G.',
      hi: 'हमारे ऐप के माध्यम से डिजिटल दान स्वीकार किया जाता है। सहायता श्रेणियां: सामान्य फंड, भोजन वितरण, चिकित्सा सहायता, सफाई। सभी दान 80G के तहत कर मुक्त हैं।'
    }
  },
  {
    keywords: ['parking', 'vehicle', 'car', 'gaadi'],
    response: {
      en: 'Designated parking areas available. Two-wheeler parking: ₹20/day, Four-wheeler: ₹50/day. Free shuttle service from parking to main area every 15 minutes.',
      hi: 'निर्धारित पार्किंग क्षेत्र उपलब्ध हैं। दो-पहिया पार्किंग: ₹20/दिन, चार-पहिया: ₹50/दिन। पार्किंग से मुख्य क्षेत्र तक हर 15 मिनट में मुफ्त शटल सेवा।'
    }
  },
  {
    keywords: ['weather', 'mausam', 'temperature'],
    response: {
      en: 'Current weather updates available on dashboard. Carry umbrella/cap for sun protection. Temperature typically ranges 15-30°C. Stay hydrated!',
      hi: 'डैशबोर्ड पर वर्तमान मौसम अपडेट उपलब्ध है। धूप से बचाव के लिए छाता/टोपी ले जाएं। तापमान आमतौर पर 15-30°C रहता है। पानी पीते रहें!'
    }
  }
];

export const getResponse = (message: string, language: 'en' | 'hi') => {
  const lowerMessage = message.toLowerCase();
  
  for (const response of chatbotResponses) {
    if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return response.response[language];
    }
  }
  
  return language === 'en' 
    ? "I'm sorry, I didn't understand that. Please try asking about timings, directions, health facilities, crowd status, food, parking, or donations."
    : "मुझे खुशी है, मैं समझ नहीं पाया। कृपया समय, दिशा, स्वास्थ्य सुविधाओं, भीड़ की स्थिति, भोजन, पार्किंग, या दान के बारे में पूछने की कोशिश करें।";
};