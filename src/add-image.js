import Image from './image.png';

export default function addImage() {
  const img = document.createElement('img');
  img.alt = 'image';
  img.width = 300;
  img.src = Image;
  const body = document.querySelector('body');
  body.appendChild(img);
}
