"use client";

import React, { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Slider } from "~/components/ui/slider";
import { Badge } from "~/components/ui/badge";
import { Sparkles, Zap, Shield, Sword, Rocket, Brain } from "lucide-react";
import { Button } from "~/ui/button";
import Link from "next/link";

const STATS = [
  {
    key: "strength",
    label: "STR",
    icon: Sword,
    max: 100,
  },
  { key: "magic", label: "MAG", icon: Sparkles, color: "#4ecdc4", max: 100 },
  { key: "speed", label: "SPD", icon: Rocket, color: "#45b7d1", max: 100 },
  {
    key: "defense",
    label: "DEF",
    max: 100,
  },
  {
    key: "intelligence",
    label: "INT",
    icon: Brain,
    max: 100,
  },
  { key: "agility", label: "AGI", icon: Zap, color: "#fd79a8", max: 100 },
];

const Page = () => {
  const [stats, setStats] = useState({
    strength: 75,
    magic: 60,
    agility: 85,
    defense: 70,
    intelligence: 90,
    speed: 80,
  });

  const chartData = STATS.map((stat) => ({
    stat: stat.label,
    value: stats[stat.key as keyof typeof stats],
    fullMark: stat.max,
  }));

  return (
    <>
      <main className="container mx-auto h-screen pt-24 pb-8">
        <div className="mx-auto max-w-2xl">
          <div className="mt-4 mb-4 space-y-4 text-center">
            <h1 className="text-foreground mb-2 text-4xl font-bold">
              Profile Details
            </h1>
          </div>

          <Card className="mx-2 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-white">
                User Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mx-auto aspect-square max-h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={chartData}>
                    <PolarAngleAxis dataKey="stat" />
                    <PolarGrid />
                    <Radar
                      dataKey="value"
                      fill="var(--color-primary)"
                      fillOpacity={0.6}
                      dot={{
                        r: 4,
                        fillOpacity: 1,
                      }}
                      animationDuration={1000}
                      animationBegin={0}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Page;
