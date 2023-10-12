
import React from "react";


export interface MainCardPropInterface {
    title?: string,
    count?: any,
    color?: string,
    direction?: string,
    spacing?: string | number,
    variant?: string,
    description?: string,
    chipColor?: string,
    icon?: any,
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