import 'package:flutter/material.dart';

import '../models/traffic_fine.dart';
import 'fine_lookup_screen.dart';
import 'payment_screen.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final sampleFine = TrafficFine(
      fineId: 'TF-2026-0147',
      vehicleNumber: 'WP 1234',
      driverName: 'K. Perera',
      offence: 'Speeding in a restricted zone',
      location: 'Galle Road, Colombo',
      officerName: 'Sgt. D. Silva',
      amount: 7500,
      issuedAt: DateTime(2026, 5, 19, 9, 40),
      status: 'Pending',
    );

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFFEAF2F8), Color(0xFFF7FAFC)],
          ),
        ),
        child: SafeArea(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(20, 12, 20, 24),
            children: [
              Row(
                children: [
                  Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      color: const Color(0xFF102A43),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: const Icon(Icons.local_police, color: Colors.white),
                  ),
                  const SizedBox(width: 12),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Traffic Fine Payment System',
                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
                        ),
                        SizedBox(height: 4),
                        Text('Sri Lanka Police mobile workflow'),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              _HeroCard(
                sampleFine: sampleFine,
                onOpenPayment: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (_) => PaymentScreen(fine: sampleFine),
                    ),
                  );
                },
              ),
              const SizedBox(height: 20),
              GridView.count(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                crossAxisCount: 2,
                mainAxisSpacing: 14,
                crossAxisSpacing: 14,
                childAspectRatio: 1.12,
                children: [
                  _QuickActionCard(
                    icon: Icons.search,
                    title: 'Lookup Fine',
                    subtitle: 'Search by vehicle or fine ID',
                    onTap: () => Navigator.of(context).push(
                      MaterialPageRoute(builder: (_) => const FineLookupScreen()),
                    ),
                  ),
                  _QuickActionCard(
                    icon: Icons.receipt_long,
                    title: 'Payment Queue',
                    subtitle: 'Review pending fine records',
                    onTap: () => Navigator.of(context).push(
                      MaterialPageRoute(builder: (_) => const FineLookupScreen()),
                    ),
                  ),
                  _QuickActionCard(
                    icon: Icons.verified,
                    title: 'Verify Receipt',
                    subtitle: 'Confirm successful payment',
                    onTap: () => Navigator.of(context).push(
                      MaterialPageRoute(builder: (_) => PaymentScreen(fine: sampleFine)),
                    ),
                  ),
                  _QuickActionCard(
                    icon: Icons.analytics_outlined,
                    title: 'Today Summary',
                    subtitle: 'Monitor issued and settled fines',
                    onTap: () {},
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _HeroCard extends StatelessWidget {
  const _HeroCard({required this.sampleFine, required this.onOpenPayment});

  final TrafficFine sampleFine;
  final VoidCallback onOpenPayment;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF102A43), Color(0xFF1C4E80)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(28),
        boxShadow: const [
          BoxShadow(
            color: Color(0x22000000),
            blurRadius: 24,
            offset: Offset(0, 14),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'First mobile slice',
            style: Theme.of(context).textTheme.labelLarge?.copyWith(
                  color: const Color(0xFFF2B94B),
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 12),
          Text(
            'Review, confirm, and settle traffic fines at the roadside.',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 16),
          Text(
            '${sampleFine.vehicleNumber} • ${sampleFine.offence}',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white70),
          ),
          const SizedBox(height: 18),
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () => Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => const FineLookupScreen()),
                  ),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: Colors.white,
                    side: const BorderSide(color: Colors.white30),
                  ),
                  child: const Text('Lookup'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: ElevatedButton(
                  onPressed: onOpenPayment,
                  style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFF2B94B)),
                  child: const Text('Pay now'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _QuickActionCard extends StatelessWidget {
  const _QuickActionCard({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white,
      borderRadius: BorderRadius.circular(24),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(24),
        child: Padding(
          padding: const EdgeInsets.all(18),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFFEAF2F8),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Icon(icon, color: const Color(0xFF102A43)),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.w800)),
                  const SizedBox(height: 6),
                  Text(subtitle, style: Theme.of(context).textTheme.bodySmall),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}