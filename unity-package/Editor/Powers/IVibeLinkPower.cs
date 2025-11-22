using System.Threading.Tasks;
using VibeLink.Protocol;

namespace VibeLink.Editor.Powers
{
    /// <summary>
    /// Interface for VibeLink Powers
    /// Each Power represents a capability that AI agents can use
    /// </summary>
    public interface IVibeLinkPower
    {
        /// <summary>
        /// Execute the power with the given message
        /// </summary>
        Task<VibeLinkResponse> Execute(VibeLinkMessage message);
        
        /// <summary>
        /// Initialize the power (called once on startup)
        /// </summary>
        void Initialize();
    }
}
