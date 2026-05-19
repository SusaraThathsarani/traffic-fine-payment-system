import 'package:flutter/material.dart';

import 'screens/dashboard_screen.dart';
import 'theme/app_theme.dart';

class TrafficFineApp extends StatelessWidget {
  const TrafficFineApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Traffic Fine Payment System',
      theme: AppTheme.light(),
      home: const DashboardScreen(),
    );
  }
}