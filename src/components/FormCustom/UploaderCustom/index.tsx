import React, { useState } from 'react';
import type { ComponentsPropsType } from './../types';
import { Uploader } from '@taroify/core';
import Taro from '@tarojs/taro';
import { publicUploadFile } from '@/services/api/public';

const UploaderCustom = (Props: ComponentsPropsType) => {
  const {
    value,
    onChange,
    maxFiles = 1,
    uploaderFormat,
    uploaderSize,
    prefixPath = 'common',
    ...rest
  } = Props;
  const [files, setFiles] = useState<any>([]);

  // const nowOnChange = (e: any) => {
  //   if (typeof onChange === 'function') {
  //     onChange(e.detail.value);
  //   }
  // };

  const onUpload = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }).then(({ tempFiles }) => {
      const newFiles = [...files];
      if (newFiles.length >= maxFiles) {
        Taro.showToast({
          title: `上传文件达到最大数量：${maxFiles} `,
          icon: 'none',
          duration: 2000,
        });
        return;
      }
      const file: any = tempFiles[0];
      if (uploaderFormat && uploaderFormat.length > 0) {
        let formatArr: any = [...uploaderFormat];
        formatArr = formatArr.map((i: string) => i.toLowerCase());
        const nameArr = file.originalFileObj.name.split('.');
        const name = nameArr[nameArr.length - 1].toLowerCase();
        if (!formatArr.includes(name)) {
          Taro.showToast({
            title: `需要上传文件格式：${formatArr.join('、')} `,
            icon: 'none',
            duration: 2000,
          });
          return;
        }
      }
      if (uploaderSize && uploaderSize > 0) {
        if (file.originalFileObj.size / 1000 > uploaderSize) {
          Taro.showToast({
            title: `需要上传文件大小：${uploaderSize}kb `,
            icon: 'none',
            duration: 2000,
          });

          return;
        }
      }

      publicUploadFile(file, {
        path: prefixPath,
      })
        .then((res: any) => {
          newFiles.push({
            url: res.data.src,
          });
          setFiles(newFiles);
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
  };

  const onRemove = (image: any) => {
    const newFiles = [...files];
    setFiles(newFiles.filter((item) => item !== image));
  };

  const previewImage = (url: string) => {
    Taro.previewImage({
      current: url, // 当前显示图片的http链接
      urls: files, // 需要预览的图片http链接列表
    });
  };
  return (
    <>
      <Uploader value={files} onUpload={onUpload} {...rest}>
        {files.map((image: any) => (
          <Uploader.Image
            key={image.url}
            url={image.url}
            name={image.name}
            type={image.type}
            onClick={() => previewImage(image.url)}
            onRemove={() => onRemove(image)}
          >
            {/* <View className="preview-cover taroify-ellipsis">{image.name}</View> */}
          </Uploader.Image>
        ))}
        {files.length < maxFiles && <Uploader.Upload />}
      </Uploader>
    </>
  );
};

export default UploaderCustom;
