'use client';

import { useUser } from '@clerk/nextjs';
import { Book, Columns2, Dot, Notebook } from 'lucide-react';

import { ExampleChart } from '@/components/ExampleChart';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
