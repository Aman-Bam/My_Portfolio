import React from 'react';

export type ToastActionElement = React.ReactNode;

export type ToastProps = {
  id?: string;
  open?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  onOpenChange?: (open: boolean) => void;
};

export default function Toast(_props: ToastProps) {
  return null;
}
