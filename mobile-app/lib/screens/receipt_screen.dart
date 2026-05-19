import 'package:flutter/material.dart';

import '../models/traffic_fine.dart';

class ReceiptScreen extends StatelessWidget {
  const ReceiptScreen({
    super.key,
    required this.fine,
    required this.paymentMethod,
    this.receiptId,
  });

  final TrafficFine fine;
  final String paymentMethod;
  final String? receiptId;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Payment Receipt')),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
        child: Column(
          children: [
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF102A43), Color(0xFF1C4E80)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(28),
              ),
              child: Column(
                children: [
                  const Icon(Icons.verified, color: Color(0xFFF2B94B), size: 58),
                  const SizedBox(height: 12),
                  Text(
                    'Payment completed',
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w800,
                        ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Receipt: ${receiptId ?? fine.fineId}',
                    style: const TextStyle(color: Colors.white70),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 18),
            _DetailPanel(fine: fine, paymentMethod: paymentMethod),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => Navigator.of(context).popUntil((route) => route.isFirst),
                child: const Text('Back to dashboard'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _DetailPanel extends StatelessWidget {
  const _DetailPanel({required this.fine, required this.paymentMethod});

  final TrafficFine fine;
  final String paymentMethod;

  @override
  Widget build(BuildContext context) {
    final receiptNumber = 'RCPT-${fine.fineId.split('-').last}-519';

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _line('Receipt number', receiptNumber),
          _line('Fine ID', fine.fineId),
          _line('Vehicle', fine.vehicleNumber),
          _line('Payment method', paymentMethod),
          _line('Amount paid', 'LKR ${fine.amount.toStringAsFixed(0)}'),
          _line('Status', 'Settled'),
        ],
      ),
    );
  }

  Widget _line(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontWeight: FontWeight.w700)),
          Flexible(
            child: Text(
              value,
              textAlign: TextAlign.right,
              style: const TextStyle(fontWeight: FontWeight.w800),
            ),
          ),
        ],
      ),
    );
  }
}