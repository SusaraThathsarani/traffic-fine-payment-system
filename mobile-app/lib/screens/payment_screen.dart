import 'package:flutter/material.dart';

import '../models/traffic_fine.dart';
import 'receipt_screen.dart';

class PaymentScreen extends StatefulWidget {
  const PaymentScreen({super.key, required this.fine});

  final TrafficFine fine;

  @override
  State<PaymentScreen> createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  String _paymentMethod = 'Card';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Payment Review')),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(widget.fine.fineId, style: const TextStyle(fontWeight: FontWeight.w800)),
                const SizedBox(height: 8),
                Text('${widget.fine.vehicleNumber} • ${widget.fine.offence}'),
                const SizedBox(height: 18),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('Amount due', style: TextStyle(fontWeight: FontWeight.w700)),
                    Text('LKR ${widget.fine.amount.toStringAsFixed(0)}', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 18),
          Text('Select payment method', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800)),
          const SizedBox(height: 10),
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: SegmentedButton<String>(
              segments: const [
                ButtonSegment(
                  value: 'Card',
                  label: Text('Card'),
                  icon: Icon(Icons.credit_card),
                ),
                ButtonSegment(
                  value: 'Cash',
                  label: Text('Cash'),
                  icon: Icon(Icons.payments_outlined),
                ),
                ButtonSegment(
                  value: 'Wallet',
                  label: Text('Wallet'),
                  icon: Icon(Icons.account_balance_wallet_outlined),
                ),
              ],
              selected: {_paymentMethod},
              onSelectionChanged: (selection) {
                setState(() => _paymentMethod = selection.first);
              },
            ),
          ),
          const SizedBox(height: 18),
          ElevatedButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => ReceiptScreen(
                    fine: widget.fine,
                    paymentMethod: _paymentMethod,
                  ),
                ),
              );
            },
            child: const Text('Confirm payment'),
          ),
        ],
      ),
    );
  }
}
