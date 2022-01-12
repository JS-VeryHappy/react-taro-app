import React from 'react';
import { Dialog, Button } from '@taroify/core';
import type { DialogCustomType } from './../types';

declare type DialogOpenCustomType = {} & DialogCustomType;

const DialogConfirmCustom = (Props: DialogOpenCustomType) => {
  const { open, onCancel, onOk, title, content } = Props;

  return (
    <>
      <Dialog open={open} onClose={onCancel}>
        <Dialog.Header>{title}</Dialog.Header>
        <Dialog.Content>{content}</Dialog.Content>
        <Dialog.Actions>
          <Button onClick={onCancel}>取消</Button>
          <Button onClick={onOk}>确认</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export default DialogConfirmCustom;
