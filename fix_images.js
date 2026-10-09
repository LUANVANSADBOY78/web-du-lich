const fs = require('fs');

const imgMap = {
  'Ðà N?ng': 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800',
  'H?i An': 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&q=80&w=800',
  'Phú Qu?c': 'https://images.unsplash.com/photo-1586521995568-39abaa0c2311?auto=format&fit=crop&q=80&w=800',
  'Hà N?i': 'https://images.unsplash.com/photo-1555920361-0475302fbf83?auto=format&fit=crop&q=80&w=800',
  'Nha Trang': 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800',
  'Sapa': 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800', // Actually Halong Bay but good enough
  'Qu?ng Ninh': 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
  'H? Chí Minh': 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800',
  'B?nh Châu': 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800',
  'Tây Ninh': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
  'Qu?c t?': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800',
  'Hàn Qu?c': 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=800',
  'Nh?t B?n': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
  'M?c ð?nh': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let regex = /(location:\s*['"])(.*?)(['"][\s\S]*?img:\s*['"])(.*?)(['"])/g;
  
  content = content.replace(regex, (match, p1, location, p3, oldImg, p5) => {
    let newImg = imgMap[location] || imgMap['M?c ð?nh'];
    // Let's also replace the gallery array if it has one item
    return p1 + location + p3 + newImg + p5;
  });
  
  // Replace gallery array strings
  let galleryRegex = /(gallery:\s*\[\s*['"])(.*?)(['"]\s*\])/g;
  let matches = [...content.matchAll(galleryRegex)];
  // It's too complex to map gallery to location exactly with regex here, 
  // so let's just make it a generic beautiful travel image for all galleries as a fallback
  content = content.replace(galleryRegex, (match, p1, oldImg, p3) => {
    return p1 + 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800' + p3;
  });

  fs.writeFileSync(filePath, content);
  console.log('Fixed images in', filePath);
}

processFile('d:/webdulich/travel-ticket-frontend/src/data/mockProducts.js');
try { processFile('d:/webdulich/travel-ticket-frontend/src/data/mockTours.js'); } catch(e){}
