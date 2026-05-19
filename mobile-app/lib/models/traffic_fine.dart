class TrafficFine {
  TrafficFine({
    required this.fineId,
    required this.vehicleNumber,
    this.driverName,
    required this.offence,
    this.location,
    this.officerName,
    required this.amount,
    required this.issuedAt,
    required this.status,
  });

  final String fineId;
  final String vehicleNumber;
  final String? driverName;
  final String offence;
  final String? location;
  final String? officerName;
  final double amount;
  final DateTime issuedAt;
  final String status;

  factory TrafficFine.fromJson(Map<String, dynamic> json) {
    return TrafficFine(
      fineId: json['fineId'] as String,
      vehicleNumber: json['vehicleNumber'] as String,
      driverName: json['driverName'] as String?,
      offence: json['offence'] as String,
      location: json['location'] as String?,
      officerName: json['officerName'] as String?,
      amount: (json['amount'] as num).toDouble(),
      issuedAt: DateTime.parse(json['issuedAt'] as String),
      status: json['status'] as String,
    );
  }
}