import { useState } from 'react';
import {
  Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface InfoModalProps {
  title: string;
  description: string;
}

export function InfoButton({ title, description }: InfoModalProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.infoBtn}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.infoBtnText}>ⓘ</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalIconWrap}>
                <Ionicons name="information-circle" size={22} color={colors.gold} />
              </View>
              <Text style={styles.modalTitle} numberOfLines={2}>{title}</Text>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setVisible(false)}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Content */}
            <ScrollView
              style={styles.scroll}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: spacing.lg }}
            >
              <Text style={styles.descText}>{description}</Text>
            </ScrollView>

            {/* Got it button */}
            <TouchableOpacity
              style={styles.gotItBtn}
              onPress={() => setVisible(false)}
              activeOpacity={0.85}
            >
              <Text style={styles.gotItText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  infoBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.gold + '88',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceHigh,
    marginLeft: 6,
  },
  infoBtnText: {
    color: colors.gold,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    textAlign: 'center',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.80)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  modal: {
    backgroundColor: colors.surfaceCard,
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    maxHeight: '80%',
    shadowColor: colors.gold,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  modalIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1,
    borderColor: colors.gold + '44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '800',
    flex: 1,
    letterSpacing: 0.2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  scroll: {
    maxHeight: 340,
  },
  descText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: typography.body ?? undefined,
  },
  gotItBtn: {
    marginTop: spacing.md,
    backgroundColor: colors.gold,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  gotItText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
