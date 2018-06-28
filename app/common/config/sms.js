const dev = {
  appId: 1400105074,
  appKey: '7d4f6c9e7947ea6c820ff8744119e403',
  smsSign: 'VUE技术栈',
  templateId: [146721, 146727, 146732]
}

const prod = {
  appId: 1400105074,
  appKey: '7d4f6c9e7947ea6c820ff8744119e403',
  smsSign: 'VUE技术栈',
  templateId: [146721, 146727, 146732]
}

module.exports = process.env.NODE_ENV === 'production' ? prod : dev
