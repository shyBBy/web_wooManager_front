import React from "react";


export interface MainCardPropInterface {
    title: string;
    count: string | number; // Zmieniono typ na string | number
    description: string;
    icon: JSX.Element;
    onClick?: (() => void) | null; // Obsługa null
    link?: string | null;         // Obsługa null
}

export interface BasicInfoStackInterface {
    model?: string,
    name?: string,
    icon?: any,
    registerNumber?: string,
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface StackListInformationProps {
    icon?: string
    title?: any;
    description: string | number | boolean;
    tooltip: string;
}