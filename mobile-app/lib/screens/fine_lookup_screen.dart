import 'package:flutter/material.dart';

import '../models/traffic_fine.dart';
import '../services/api_service.dart';
import 'payment_screen.dart';

class FineLookupScreen extends StatefulWidget {
  const FineLookupScreen({super.key});

  @override
  State<FineLookupScreen> createState() => _FineLookupScreenState();
}

class _FineLookupScreenState extends State<FineLookupScreen> {
  final TextEditingController _vehicleController = TextEditingController(text: 'WP 1234');
  final TextEditingController _fineController = TextEditingController(text: 'TF-2026-0147');

  TrafficFine? _result;

  @override
  void dispose() {
    _vehicleController.dispose();
    _fineController.dispose();
    super.dispose();
  }

  void _searchFine() async {
    if (_vehicleController.text.trim().isEmpty && _fineController.text.trim().isEmpty) {
      setState(() => _result = null);
      return;
    }

    TrafficFine? fine;
    if (_vehicleController.text.trim().isNotEmpty) {
      fine = await ApiService.getFineByVehicle(_vehicleController.text.trim());
    } else if (_fineController.text.trim().isNotEmpty) {
      fine = await ApiService.getFineById(_fineController.text.trim());
    }

    setState(() => _result = fine);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Fine Lookup')),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
        children: [
          Text(
            'Search by vehicle number or fine ID to load a payment-ready fine record.',
            style: Theme.of(context).textTheme.bodyLarge,
          ),
          const SizedBox(height: 20),
          TextField(
            controller: _vehicleController,
            decoration: const InputDecoration(
              labelText: 'Vehicle number',
              hintText: 'WP 1234',
              prefixIcon: Icon(Icons.directions_car),
            ),
          ),
          const SizedBox(height: 14),
          TextField(
            controller: _fineController,
            decoration: const InputDecoration(
              labelText: 'Fine ID',
              hintText: 'TF-2026-0147',
              prefixIcon: Icon(Icons.confirmation_number),
            ),
          ),
          const SizedBox(height: 18),
          ElevatedButton.icon(
            onPressed: _searchFine,
            icon: const Icon(Icons.search),
            label: const Text('Search fine'),
          ),
          const SizedBox(height: 18),
          if (_result != null) _FineResultCard(fine: _result!),
          if (_result == null)
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(24),
              ),
              child: const Text('No fine record loaded yet.'),
            ),
        ],
      ),
    );
  }
}

class _FineResultCard extends StatelessWidget {
  const _FineResultCard({required this.fine});

  final TrafficFine fine;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(fine.fineId, style: const TextStyle(fontWeight: FontWeight.w800)),
              Chip(label: Text(fine.status)),
            ],
          ),
          const SizedBox(height: 12),
          _row('Vehicle', fine.vehicleNumber),
          _row('Driver', fine.driverName),
          _row('Offence', fine.offence),
          _row('Location', fine.location),
          _row('Officer', fine.officerName),
          _row('Issued', '${fine.issuedAt.year}-${fine.issuedAt.month.toString().padLeft(2, '0')}-${fine.issuedAt.day.toString().padLeft(2, '0')}'),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Amount due', style: TextStyle(fontWeight: FontWeight.w700)),
              Text('LKR ${fine.amount.toStringAsFixed(0)}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
            ],
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => PaymentScreen(fine: fine)),
              ),
              child: const Text('Continue to payment'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _row(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(width: 92, child: Text(label, style: const TextStyle(fontWeight: FontWeight.w700))),
          Expanded(child: Text(value)),
        ],
      ),
    );
  }
}