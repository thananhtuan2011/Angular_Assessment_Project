export default class VideoTool {
  static get toolbox() {
    return {
      title: 'Video',
      icon: '  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 7L9 12L21 17V7Z" fill="currentColor"/><path d="M3 5H17V19H3V5Z" fill="currentColor"/> </svg>', // SVG icon for the toolbox
    };
  }

  constructor({ data, api, config }) {
    this.api = api;
    this.config = config;
    this.data = {
      url: data.url || '',
    };
    this.wrapper = null;
    this.videoElement = null;
  }

  render() {
    this.wrapper = document.createElement('div');

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.addEventListener('change', (event) => this.handleVideoUpload(event.target.files[0]));

    this.videoElement = document.createElement('video');
    this.videoElement.controls = true;
    if (this.data.url) {
      this.videoElement.src = this.data.url;
    }

    this.wrapper.appendChild(input);
    this.wrapper.appendChild(this.videoElement);
    return this.wrapper;
  }

  save(blockContent) {
    return {
      url: this.data.url,
    };
  }

  handleVideoUpload(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.data.url = event.target.result;
      this.updateVideoSrc();
    };
    reader.readAsDataURL(file);
  }

  updateVideoSrc() {
    this.videoElement.src = this.data.url;
  }
}