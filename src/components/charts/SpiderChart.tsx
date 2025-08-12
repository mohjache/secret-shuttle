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
    label: "Strength",
    icon: Sword,
    color: "#ff6b6b",
    max: 100,
  },
  { key: "magic", label: "Magic", icon: Sparkles, color: "#4ecdc4", max: 100 },
  { key: "speed", label: "Speed", icon: Rocket, color: "#45b7d1", max: 100 },
  {
    key: "defense",
    label: "Defense",
    icon: Shield,
    color: "#96ceb4",
    max: 100,
  },
  {
    key: "intelligence",
    label: "Intelligence",
    icon: Brain,
    color: "#ffeaa7",
    max: 100,
  },
  { key: "energy", label: "Energy", icon: Zap, color: "#fd79a8", max: 100 },
];

export function SpiderChart() {
  const [stats, setStats] = useState({
    strength: 75,
    magic: 60,
    speed: 85,
    defense: 70,
    intelligence: 90,
    energy: 80,
  });

  const chartData = STATS.map((stat) => ({
    stat: stat.label,
    value: stats[stat.key as keyof typeof stats],
    fullMark: stat.max,
  }));

  const updateStat = (statKey: string, value: number[]) => {
    setStats((prev) => ({
      ...prev,
      [statKey]: value[0],
    }));
  };

  const getTotalPower = () => {
    return Object.values(stats).reduce((sum, value) => sum + value, 0);
  };

  const getAverageScore = () => {
    return Math.round(getTotalPower() / Object.keys(stats).length);
  };

  const getPowerLevel = () => {
    const avg = getAverageScore();
    if (avg >= 90)
      return {
        level: "Legendary",
        color: "bg-gradient-to-r from-yellow-400 to-orange-500",
      };
    if (avg >= 75)
      return {
        level: "Epic",
        color: "bg-gradient-to-r from-purple-500 to-pink-500",
      };
    if (avg >= 60)
      return {
        level: "Rare",
        color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      };
    if (avg >= 40)
      return {
        level: "Common",
        color: "bg-gradient-to-r from-green-500 to-emerald-500",
      };
    return {
      level: "Novice",
      color: "bg-gradient-to-r from-gray-500 to-slate-500",
    };
  };

  const powerLevel = getPowerLevel();

  return (
    <>
      {/* Header */}
      <div className="mt-4 mb-4 space-y-4 text-center">
        <h1 className="text-foreground mb-2 text-4xl font-bold">
          Character Stats Dashboard
        </h1>
        <div className="flex items-center justify-center gap-4">
          {/* <Button variant="outline" className="p-4" asChild>
            <Link href="/dashboard">Back</Link>
          </Button> */}
          <Badge
            className={`${powerLevel.color} text-foreground animate-pulse px-4 py-2 text-lg`}
          >
            {powerLevel.level} Level
          </Badge>
          <div className="text-foreground">
            <span className="text-2xl font-bold">{getAverageScore()}</span>
            <span className="ml-1 text-sm opacity-70">avg score</span>
          </div>
          <div className="text-foreground">
            <span className="text-2xl font-bold">{getTotalPower()}</span>
            <span className="ml-1 text-sm opacity-70">total power</span>
          </div>
        </div>
      </div>
      {/* Header */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Spider Chart */}
        <Card className="mx-2 border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-white">
              Character Radar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={chartData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <defs>
                    <radialGradient
                      id="radarGradient"
                      cx="50%"
                      cy="50%"
                      r="50%"
                    >
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop
                        offset="50%"
                        stopColor="#3b82f6"
                        stopOpacity={0.6}
                      />
                      <stop
                        offset="100%"
                        stopColor="#06b6d4"
                        stopOpacity={0.3}
                      />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <PolarGrid
                    stroke="#475569"
                    strokeWidth={1}
                    className="opacity-50"
                  />
                  <PolarAngleAxis
                    dataKey="stat"
                    tick={{
                      fill: "#e2e8f0",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                    className="text-slate-200"
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "#64748b", fontSize: 10 }}
                    strokeOpacity={0.3}
                  />
                  <Radar
                    name="Stats"
                    dataKey="value"
                    stroke="url(#radarGradient)"
                    fill="url(#radarGradient)"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
                    fillOpacity={0.3}
                    filter="url(#glow)"
                    animationDuration={1000}
                    animationBegin={0}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <Card className="mx-2 border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-white">
              Adjust Your Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {STATS.map((stat) => {
              const IconComponent = stat.icon;
              const currentValue = stats[stat.key as keyof typeof stats];

              return (
                <div
                  key={stat.key}
                  className="space-y-3 rounded-lg border border-slate-600/30 bg-slate-700/30 p-2 transition-all duration-300 hover:border-slate-500/50 hover:bg-slate-700/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="rounded-lg p-2"
                        style={{
                          backgroundColor: `${stat.color}20`,
                          border: `1px solid ${stat.color}40`,
                        }}
                      >
                        <IconComponent
                          size={20}
                          style={{ color: stat.color }}
                        />
                      </div>
                      <span className="font-medium text-white">
                        {stat.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-l font-bold"
                        style={{ color: stat.color }}
                      >
                        {currentValue}
                      </span>
                      <span className="ml-1 text-sm text-slate-400">
                        / {stat.max}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Slider
                      value={[currentValue]}
                      onValueChange={(value) => updateStat(stat.key, value)}
                      max={stat.max}
                      step={1}
                      className="w-full"
                      style={
                        {
                          "--slider-thumb": stat.color,
                          "--slider-track": `${stat.color}40`,
                        } as React.CSSProperties
                      }
                    />

                    {/* Progress bar visualization */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-600">
                      <div
                        className="relative h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${(currentValue / stat.max) * 100}%`,
                          background: `linear-gradient(90deg, ${stat.color}80, ${stat.color})`,
                          boxShadow: `0 0 10px ${stat.color}60`,
                        }}
                      >
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Quick Actions */}
            <div className="flex gap-2 pt-4">
              <button
                onClick={() =>
                  setStats(
                    Object.fromEntries(
                      STATS.map((s) => [s.key, 100]),
                    ) as typeof stats,
                  )
                }
                className="flex-1 transform rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:from-emerald-600 hover:to-teal-600"
              >
                Max All
              </button>
              <button
                onClick={() =>
                  setStats(
                    Object.fromEntries(
                      STATS.map((s) => [
                        s.key,
                        Math.floor(Math.random() * 101),
                      ]),
                    ) as typeof stats,
                  )
                }
                className="flex-1 transform rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:from-purple-600 hover:to-pink-600"
              >
                Randomize
              </button>
              <button
                onClick={() =>
                  setStats(
                    Object.fromEntries(
                      STATS.map((s) => [s.key, 0]),
                    ) as typeof stats,
                  )
                }
                className="flex-1 transform rounded-lg bg-gradient-to-r from-slate-500 to-gray-500 px-4 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:from-slate-600 hover:to-gray-600"
              >
                Reset
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
