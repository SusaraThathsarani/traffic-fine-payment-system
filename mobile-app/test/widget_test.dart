import 'package:flutter_test/flutter_test.dart';

import 'package:traffic_fine_payment_system/app.dart';

void main() {
  testWidgets('launches the traffic fine dashboard', (WidgetTester tester) async {
    await tester.pumpWidget(const TrafficFineApp());

    expect(find.text('Traffic Fine Payment System'), findsOneWidget);
    expect(find.text('Sri Lanka Police mobile workflow'), findsOneWidget);
  });
}
