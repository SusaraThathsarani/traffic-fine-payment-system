import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/traffic_fine.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:3001/api';

  // Fetch fine by vehicle number
  static Future<TrafficFine?> getFineByVehicle(String vehicleNumber) async {
    try {
      final response =
          await http.get(Uri.parse('$baseUrl/fines?vehicle=$vehicleNumber'));
      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);
        return TrafficFine.fromJson(json['fine']);
      }
      return null;
    } catch (e) {
      print('Error fetching fine: $e');
      return null;
    }
  }

  // Fetch fine by fine ID
  static Future<TrafficFine?> getFineById(String fineId) async {
    try {
      final response =
          await http.get(Uri.parse('$baseUrl/fines?fineId=$fineId'));
      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);
        return TrafficFine.fromJson(json['fine']);
      }
      return null;
    } catch (e) {
      print('Error fetching fine: $e');
      return null;
    }
  }

  // Process payment
  static Future<Map<String, dynamic>?> processPayment(
      String fineId, String method) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/payments'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'fineId': fineId, 'method': method}),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      return null;
    } catch (e) {
      print('Error processing payment: $e');
      return null;
    }
  }
}
