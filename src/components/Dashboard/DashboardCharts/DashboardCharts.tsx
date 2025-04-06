import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
    { name: "Styczeń", sprzedaż: 4000, zamówienia: 2400 },
    { name: "Luty", sprzedaż: 3000, zamówienia: 1398 },
    { name: "Marzec", sprzedaż: 2000, zamówienia: 9800 },
    { name: "Kwiecień", sprzedaż: 2780, zamówienia: 3908 },
    { name: "Maj", sprzedaż: 1890, zamówienia: 4800 },
    { name: "Czerwiec", sprzedaż: 2390, zamówienia: 3800 },
    { name: "Lipiec", sprzedaż: 3490, zamówienia: 4300 },
];

export const DashboardCharts = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sprzedaż" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="zamówienia" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};