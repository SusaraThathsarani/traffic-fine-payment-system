class TrafficFine {
  const TrafficFine({
    required this.fineId,
    required this.vehicleNumber,
    required this.driverName,
    required this.offence,
    required this.location,
    required this.officerName,
    required this.amount,
    required this.issuedAt,
    required this.status,
  });

  final String fineId;
  final String vehicleNumber;
  final String driverName;
  final String offence;
  final String location;
  final String officerName;
  final double amount;
  final DateTime issuedAt;
  final String status;
}