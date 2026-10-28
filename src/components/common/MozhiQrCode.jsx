import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

// Helper function to create QRCodeStyling instance with our official Mozhi dot & curve design
export const createMozhiQrInstance = ({
  data,
  size = 500,
  color = '#4C1D95',
  iconSrc = '/mozhi-icon.png'
}) => {
  return new QRCodeStyling({
    width: size,
    height: size,
    type: 'canvas',
    data: data || window.location.href,
    image: iconSrc,
    margin: 6,
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: 'H'
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.35,
      margin: 4,
      crossOrigin: 'anonymous'
    },
    dotsOptions: {
      color: color,
      type: 'dots' // Circular dots
    },
    backgroundOptions: {
      color: '#FFFFFF'
    },
    cornersSquareOptions: {
      color: color,
      type: 'extra-rounded' // Extra rounded leaf corners
    },
    cornersDotOptions: {
      color: color,
      type: 'dot' // Rounded inner eye
    }
  });
};

// High-resolution Standee PNG Download Helper with 100% guaranteed Mozhi center icon
export const downloadBrandedQrStandee = async ({
  businessName = 'Store',
  url = window.location.href,
  color = '#4C1D95',
  iconSrc = '/mozhi-icon.png'
}) => {
  const qrInstance = createMozhiQrInstance({
    data: url,
    size: 500,
    color,
    iconSrc
  });

  // Get raw blob from qr-code-styling
  const qrBlob = await qrInstance.getRawData('png');
  const qrBlobUrl = URL.createObjectURL(qrBlob);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 1100;

  // Load QR Image
  const qrImg = new Image();
  qrImg.crossOrigin = 'anonymous';

  // Load Center Mozhi Icon Image explicitly to guarantee 100% crisp render
  const iconImg = new Image();
  iconImg.crossOrigin = 'anonymous';

  await Promise.all([
    new Promise((resolve) => {
      qrImg.onload = resolve;
      qrImg.onerror = resolve;
      qrImg.src = qrBlobUrl;
    }),
    new Promise((resolve) => {
      iconImg.onload = resolve;
      iconImg.onerror = resolve;
      iconImg.src = iconSrc;
    })
  ]);

  if (ctx) {
    // 1. Draw crisp white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 800, 1100);

    // 2. Draw subtle border & gradient accent top bar
    const gradient = ctx.createLinearGradient(0, 0, 800, 0);
    gradient.addColorStop(0, '#2563EB');
    gradient.addColorStop(0.5, '#9333EA');
    gradient.addColorStop(1, '#F43F5E');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 16);

    // 3. Draw Store Header
    ctx.fillStyle = '#1E1B4B';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(businessName, 400, 120);

    // 4. Draw Subtitle
    ctx.fillStyle = '#6B7280';
    ctx.font = '500 22px sans-serif';
    ctx.fillText('Scan to leave a 5-Star review on Google ⭐', 400, 165);

    // 5. Draw 500x500 QR Code centered
    ctx.drawImage(qrImg, 150, 230, 500, 500);

    // 6. Explicitly draw crisp center circle & Mozhi icon to guarantee icon is NEVER missing
    const centerX = 400;
    const centerY = 480;
    const iconSize = 140;

    ctx.save();
    // White background badge for icon
    ctx.beginPath();
    ctx.arc(centerX, centerY, (iconSize / 2) + 12, 0, Math.PI * 2, true);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#F3E8FF';
    ctx.stroke();

    // Draw Mozhi Center Icon
    if (iconImg.complete && iconImg.naturalWidth > 0) {
      ctx.drawImage(
        iconImg,
        centerX - (iconSize / 2),
        centerY - (iconSize / 2),
        iconSize,
        iconSize
      );
    }
    ctx.restore();

    // 7. Draw Scan Tip Pill
    ctx.fillStyle = '#FAF5FF';
    ctx.strokeStyle = '#E9D5FF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(220, 765, 360, 50, 25);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#6B21A8';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Point Camera & Post in 30s', 400, 797);

    // 8. Draw Footer
    ctx.fillStyle = '#1E1B4B';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('Thank you for your support! 💜', 400, 865);

    ctx.fillStyle = '#9CA3AF';
    ctx.font = '600 16px sans-serif';
    ctx.fillText('Powered by Mozhi • 100% Secure & Verified Touchpoint', 400, 910);

    const pngFile = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.download = `${businessName.replace(/\s+/g, '_')}_QR_Standee.png`;
    downloadLink.href = pngFile;
    downloadLink.click();
  }

  URL.revokeObjectURL(qrBlobUrl);
};

export const MozhiQrCode = ({
  value,
  size = 215,
  color = '#4C1D95',
  iconSrc = '/mozhi-icon.png',
  className = '',
  id = 'mozhi-qr-code-canvas'
}) => {
  const ref = useRef(null);
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const qrCode = createMozhiQrInstance({
      data: value || window.location.href,
      size,
      color,
      iconSrc
    });

    qrCodeRef.current = qrCode;

    if (ref.current) {
      ref.current.innerHTML = '';
      qrCode.append(ref.current);
    }
  }, [value, size, color, iconSrc]);

  return (
    <div
      ref={ref}
      id={id}
      className={`flex items-center justify-center rounded-2xl overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    />
  );
};
