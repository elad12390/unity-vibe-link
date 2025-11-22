using UnityEngine;

namespace VibeLink.Examples
{
    /// <summary>
    /// A simple enemy that chases a target (usually the Player).
    /// </summary>
    public class SimpleChaserEnemy : MonoBehaviour
    {
        [Header("Settings")]
        [Tooltip("Movement speed of the enemy.")]
        public float speed = 3.0f;

        [Tooltip("Tag of the object to chase.")]
        public string targetTag = "Player";

        [Tooltip("Distance to stop chasing.")]
        public float stopDistance = 1.0f;

        private Transform _target;

        private void Start()
        {
            // Find the target by tag
            GameObject targetObj = GameObject.FindGameObjectWithTag(targetTag);
            if (targetObj != null)
            {
                _target = targetObj.transform;
            }
            else
            {
                Debug.LogWarning($"[SimpleChaserEnemy] No object with tag '{targetTag}' found.");
            }
        }

        private void Update()
        {
            if (_target == null) return;

            // Calculate distance
            float distance = Vector3.Distance(transform.position, _target.position);

            // Move if further than stop distance
            if (distance > stopDistance)
            {
                // Move towards target
                float step = speed * Time.deltaTime;
                transform.position = Vector3.MoveTowards(transform.position, _target.position, step);
                
                // Look at target (optional, keeps it facing the player)
                transform.LookAt(_target);
            }
        }

        private void OnCollisionEnter(Collision collision)
        {
            if (collision.gameObject.CompareTag(targetTag))
            {
                Debug.Log($"[SimpleChaserEnemy] Caught the {targetTag}!");
                // Add damage logic here
            }
        }
    }
}
