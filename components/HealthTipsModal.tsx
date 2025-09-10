import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { BASE_URL } from '@/constants/config';
import { HealthTip } from '@/types';
import { X, Plus, Edit2, Trash2 } from 'lucide-react-native';

interface HealthTipsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function HealthTipsModal({ visible, onClose }: HealthTipsModalProps) {
  const [healthTips, setHealthTips] = useState<HealthTip[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingTip, setEditingTip] = useState<HealthTip | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchHealthTips = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/health-tips`);
      setHealthTips(response.data);
    } catch (error) {
      console.error('Failed to fetch health tips:', error);
      Alert.alert('Error', 'Failed to load health tips');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchHealthTips();
    }
  }, [visible]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Please fill in both title and content');
      return;
    }

    try {
      setLoading(true);
      if (editingTip) {
        // Update existing tip
        await axios.put(`${BASE_URL}/health-tips/${editingTip._id}`, {
          title: title.trim(),
          content: content.trim(),
        });
      } else {
        // Create new tip
        await axios.post(`${BASE_URL}/health-tips`, {
          title: title.trim(),
          content: content.trim(),
        });
      }

      // Reset form
      setTitle('');
      setContent('');
      setEditingTip(null);

      // Refresh list
      fetchHealthTips();
    } catch (error) {
      console.error('Failed to save health tip:', error);
      Alert.alert('Error', 'Failed to save health tip');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tip: HealthTip) => {
    setEditingTip(tip);
    setTitle(tip.title);
    setContent(tip.content);
  };

  const handleDelete = async (tipId: string) => {
    Alert.alert(
      'Delete Health Tip',
      'Are you sure you want to delete this health tip?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await axios.delete(`${BASE_URL}/health-tips/${tipId}`);
              fetchHealthTips();
            } catch (error) {
              console.error('Failed to delete health tip:', error);
              Alert.alert('Error', 'Failed to delete health tip');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setEditingTip(null);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Manage Health Tips</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#64748b" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.formTitle}>
              {editingTip ? 'Edit Health Tip' : 'Add New Health Tip'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />

            <TextInput
              style={[styles.input, styles.contentInput]}
              placeholder="Content"
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={4}
              maxLength={500}
            />

            <View style={styles.formButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
                disabled={loading}
              >
                <Text style={styles.saveButtonText}>
                  {loading ? 'Saving...' : editingTip ? 'Update' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tips List */}
          <View style={styles.tipsList}>
            <Text style={styles.listTitle}>Existing Health Tips</Text>

            {healthTips.length === 0 ? (
              <Text style={styles.noTips}>No health tips available</Text>
            ) : (
              healthTips.map((tip) => (
                <View key={tip._id} style={styles.tipCard}>
                  <View style={styles.tipContent}>
                    <Text style={styles.tipTitle}>{tip.title}</Text>
                    <Text style={styles.tipText}>{tip.content}</Text>
                  </View>

                  <View style={styles.tipActions}>
                    <TouchableOpacity
                      onPress={() => handleEdit(tip)}
                      style={styles.actionButton}
                    >
                      <Edit2 size={18} color="#0ea5e9" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleDelete(tip._id)}
                      style={styles.actionButton}
                    >
                      <Trash2 size={18} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  contentInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
  },
  cancelButtonText: {
    color: '#64748b',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: Colors.primary,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  tipsList: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  noTips: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 16,
    marginTop: 40,
  },
  tipCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipContent: {
    flex: 1,
    marginRight: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  tipActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
});
